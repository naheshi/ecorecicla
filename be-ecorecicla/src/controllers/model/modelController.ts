import type { Request, Response } from "express";
import { isUserConnected, sendToUser } from "../ws/connectionController";
import { scannedCodes } from "../../utils/cacheCodes";

export const getBarcodeScan = async (req: Request, res: Response): Promise<any> => {
    const { barcode } = req.params;

    if (!barcode) {
        return res.status(400).json({ message: 'Código de barras (barcode) es requerido' });
    }

    try {
        if (!scannedCodes.has(barcode)) {
            scannedCodes.add(barcode);
        } else {
            return res.status(409).json({ message: 'El código ya fue escaneado anteriormente' });
        }

        if (isUserConnected(barcode)) {
            const sent = sendToUser(barcode, {
                event: 'test_message',
                payload: {
                    redirectTo: 'jkejejej',
                },
            });

            if (sent) {
                res.send(`✅ Mensaje enviado a ${barcode}`);
            } else {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const deleteBarcodeScan = async (req: Request, res: Response): Promise<any> => {
    const { barcode } = req.params;

    if (!barcode) {
        return res.status(400).json({ message: 'Código de barras (barcode) es requerido' });
    }

    try {
        if (scannedCodes.has(barcode)) {
            scannedCodes.delete(barcode);
        } else {
            return res.status(409).json({ message: 'El código no se encuentra' });
        }

        if (isUserConnected(barcode)) {
            const sent = sendToUser(barcode, {
                event: 'delete',
                payload: {
                    redirectTo: 'jkejejej',
                },
            });

            if (sent) {
                res.send(`✅ Mensaje enviado a ${barcode}`);
            } else {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const cancelScan = async (req: Request, res: Response): Promise<any> => {
    try {
        if (scannedCodes.has(req.user.barcode)) {
            scannedCodes.delete(req.user.barcode);
            const sent = sendToUser(req.user.barcode, {
                event: 'cancel_transaction',
                payload: {
                    redirectTo: 'jkejejej',
                },
            });
            if (sent) {
                return res.status(200).json({ message: `Código ${req.user.barcode} eliminado correctamente` });
            } else {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            return res.status(404).json({ message: 'Código no encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const verifyMachine = async (req: Request, res: Response): Promise<any> => {
    const { barcode } = req.params;

    if (!barcode) {
        return res.status(400).json({ message: 'Código de barras (barcode) es requerido' });
    }

    if (scannedCodes.has(barcode)) {
        return res.status(200).json({ message: true });
    } else {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}