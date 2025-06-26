import type { Request, Response } from 'express';
import path from 'path';
import { prisma } from '../../utils/prismaclient';
import { s3 } from '../../utils/s3client';

export const registerProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        if (!req.user?.isAdmin) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const { name, descr, units, price } = req.body;
        const files = req.files;

        if (!name || !descr || !units || !price) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        if (!files || !Array.isArray(files) || files.length === 0) {
            return res.status(400).json({ error: 'No se recibieron archivos' });
        }

        const product = await prisma.product.create({
            data: {
                name,
                descr,
                units: parseInt(units),
                price: parseInt(price)
            }
        });

        const imagePromises = files.map(async (file) => {
            const extension = path.extname(file.originalname);
            const fileKey = `product/${crypto.randomUUID()}${extension}`;

            await s3.write(fileKey, file.buffer, {
                type: file.mimetype,
            });

            return prisma.image.create({
                data: {
                    url: fileKey,
                    productId: product.id
                }
            });
        });


        await Promise.all(imagePromises);

        return res.status(200).json({
            message: "Producto registrado correctamente",
            product
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        if (!req.user?.isAdmin) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const productId = Number(id);

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { image: true },
        });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const deleteImagePromises = product.image.map(image =>
            s3.delete(image.url)
        );

        await Promise.all(deleteImagePromises);

        await prisma.image.deleteMany({
            where: { productId: productId }
        });

        await prisma.product.delete({
            where: { id: productId }
        });

        return res.status(200).json({ message: 'Producto eliminado correctamente' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
