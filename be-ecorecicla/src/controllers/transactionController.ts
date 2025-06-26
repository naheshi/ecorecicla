import type { Request, Response } from 'express';
import { prisma } from '../utils/prismaclient';

export const getRaking = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, scannedItems } = req.body;

        if (!userId || !Array.isArray(scannedItems)) {
            return res.status(400).json({ error: 'userId y scannedItems son requeridos' });
        }

        const transaction = await prisma.transaction.create({
            data: {
                user: { connect: { id: userId } },
                itemscanned: {
                    create: scannedItems.map((item) => ({
                        url: item.url,
                        typeitem: { connect: { id: item.typeitemId } },
                    })),
                },
            },
            include: {
                itemscanned: {
                    include: { typeitem: true },
                },
            },
        });

        const totalEarnedPoints = transaction.itemscanned.reduce((sum, scanned) => {
            return sum + scanned.typeitem.points;
        }, 0);

        await prisma.user.update({
            where: { id: userId },
            data: {
                totalPoints: {
                    increment: totalEarnedPoints,
                },
            },
        });

        const referredUser = await prisma.user.findUnique({
            where: { id: userId },
            include: { referredBy: true },
        });

        if (referredUser?.referredById) {
            const bonusPoints = Math.floor(totalEarnedPoints * 0.01);

            await prisma.user.update({
                where: { id: referredUser.referredById },
                data: {
                    totalPoints: { increment: bonusPoints },
                    referralPoints: { increment: bonusPoints },
                },
            });
        }

        res.status(201).json({ transaction, earnedPoints: totalEarnedPoints });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }

};