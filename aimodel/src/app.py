import threading
import cv2
import os
import requests
from flask import Flask, jsonify
from pyzbar.pyzbar import decode
from playsound import playsound
from ultralytics import YOLO
from user import guardar_usuario_activo
from settings import url_backend, API_TOKEN

app = Flask(__name__)

# Configuración
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model = YOLO('src/yolov11.pt')

# Bandera para simular la tecla 'c'
presionar_c = False
presionar_q = False

def detectar_objetos(frame):
    temp_path = 'temp.jpg'
    cv2.imwrite(temp_path, frame)

    results = model.predict(temp_path, conf=0.5)

    objeto_valido = False
    frame_resultado = frame.copy()

    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            clase = r.names[int(box.cls[0])]
            confianza = float(box.conf[0])

            print(f'Clase: {clase}, Confianza: {confianza:.2f}')

            color = (0, 255, 0) if clase in ['Transparet Plastic Bottle', 'PET'] else (0, 0, 255)

            cv2.rectangle(frame_resultado, (x1, y1), (x2, y2), color, 2)
            cv2.putText(frame_resultado, f'{clase} {confianza:.2f}', (x1, y1 - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

            if clase in ['Transparet Plastic Bottle', 'PET']:
                objeto_valido = True

    return frame_resultado, objeto_valido


def clasificar_imagen_yolo():
    global presionar_c, presionar_q
    cap = cv2.VideoCapture(0)
    print("Cámara abierta. Presiona 'C' o usa el botón en React para capturar.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error de cámara")
            break

        cv2.imshow("YOLO Detección", frame)
        key = cv2.waitKey(1)

        if key == ord('c') or presionar_c:
            print("🔍 Detectando objetos...")

            result_frame, es_valido = detectar_objetos(frame)
            cv2.imshow("Resultado YOLO", result_frame)
            cv2.waitKey(3000)

            if es_valido:
                print("Clasificación válida: botella o PET detectado.")
            else:
                print("Clasificación inválida: subiendo imagen como error...")

            presionar_c = False  # Reiniciar la bandera después de la captura

        elif key in [27, ord('q')] or presionar_q:
            print("Saliendo del modo clasificación.")
            presionar_q = False
            break

    cap.release()
    cv2.destroyAllWindows()


def escanear_codigo():
    cap = cv2.VideoCapture(0)
    cap.set(3, 640)
    cap.set(4, 460)

    print("📡 Escaneando código...")
    while True:
        success, frame = cap.read()
        if not success:
            print("No se pudo leer el frame")
            break

        for barcode in decode(frame):
            code_data = barcode.data.decode('utf-8')
            if code_data:
                playsound(os.path.join(BASE_DIR, 'sounds', 'scan.mp3'))

                try:
                    headers = {
                        'Authorization': f'Bearer {API_TOKEN}',
                        'Content-Type': 'application/json'
                    }
                    response = requests.post(f'{url_backend}/scan/{code_data}', headers=headers)
                    if response.status_code == 200:
                        guardar_usuario_activo(code_data)
                        print('Código aprobado por backend. Iniciando clasificación...')
                        cap.release()
                        cv2.destroyAllWindows()
                        clasificar_imagen_yolo()
                        return  # salir tras clasificar
                    else:
                        print(f'Error del backend: {response.status_code}')
                except Exception as e:
                    print(f'Error al comunicar con backend: {e}')

        cv2.imshow('Escáner de código', frame)
        if cv2.waitKey(1) & 0xFF in [27, ord('q')]:
            break

    cap.release()
    cv2.destroyAllWindows()


@app.route('/presionar_c', methods=['POST'])
def presionar_c():
    global presionar_c
    presionar_c = True
    return jsonify({"message": "Simulación de presión de 'c' recibida"}), 200

@app.route('/presionar_q', methods=['POST'])
def presionar_q():
    global presionar_q
    presionar_q = True
    return jsonify({"message": "Simulación de presión de 'q' recibida"}), 200


if __name__ == '__main__':
    threading.Thread(target=escanear_codigo).start()
    app.run(host='0.0.0.0', port=5000)
