import type { Request, Response } from 'express';
import { prisma } from "../utils/prismaclient";

export const getRaking = async (req: Request, res: Response): Promise<any> => {
    try {
        if (isNaN(Number(req.user.id))) {
            return res.status(500).json({ message: 'Internal Server Error', });
        } 
        
        const result = await prisma.$queryRawUnsafe<
            {
                id: number;
                name: string;
                totalPoints: number;
                position: number;
                isCurrentUser: boolean;
            }[]
        >(`
        WITH user_points AS (
            SELECT 
                u.id,
                u.name,
                COALESCE(SUM(ti.points), 0) AS totalPoints
            FROM User u
            LEFT JOIN Transaction t ON t.userId = u.id
            LEFT JOIN ItemScanned i ON i.transactionId = t.id
            LEFT JOIN TypeItem ti ON ti.id = i.typeitemID
            GROUP BY u.id
        ),
        ranked AS (
            SELECT 
                *,
                RANK() OVER (ORDER BY totalPoints DESC) AS position
            FROM user_points
        )
            SELECT 
            r.*,
            r.id = ${Number(req.user.id)} AS isCurrentUser
            FROM ranked r
            WHERE r.position <= 10 OR r.id = ${Number(req.user.id)}
            ORDER BY r.position;
        `);
        const safeResult = result.map(r => ({
            name: r.name,
            totalPoints: Number(r.totalPoints),
            position: Number(r.position),
            isCurrentUser: Boolean(r.isCurrentUser),
        }));


        const top10 = safeResult.filter(r => r.position <= 10);
        const userRank = safeResult.find(r => r.isCurrentUser);

        return res.status(200).json({ top10, userRank });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}