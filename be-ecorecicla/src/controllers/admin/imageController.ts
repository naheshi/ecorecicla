import type { Request, Response } from 'express';
import { prisma } from '../../utils/prismaclient';
import { s3 } from '../../utils/s3client';
import path from 'path';

export const deleteProductImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!req.user?.isAdmin) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const imageId = Number(id);

        const image = await prisma.image.findUnique({
            where: { id: imageId }
        });

        if (!image) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }

        await s3.delete(image.url);

        await prisma.image.delete({
            where: { id: imageId }
        });

        return res.status(200).json({ message: 'Imagen eliminada correctamente' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const editProductImage = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!req.user?.isAdmin) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        if (!file) {
            return res.status(400).json({ error: 'No se ha proporcionado una nueva imagen' });
        }

        const imageId = Number(id);

        const image = await prisma.image.findUnique({
            where: { id: imageId }
        });

        if (!image) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }

        await s3.delete(image.url);
        const extension = path.extname(file.originalname);
        const fileKey = `product/${crypto.randomUUID()}${extension}`;

        await s3.write(fileKey, file.buffer, {
            type: file.mimetype,
        });

        await prisma.image.update({
            where: { id: imageId },
            data: { url: fileKey }
        });

        return res.status(200).json({ message: 'Imagen actualizada correctamente' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
