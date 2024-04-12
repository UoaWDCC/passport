/* 
  Example Route File
*/
import { Router } from 'express';
import type { Request, Response } from 'express';
import { z } from 'zod';

const helloRoutes = Router();

helloRoutes.get('/', async (req: Request, res: Response) => {
  // const Name = z.object({
  //   name: z.string(),
  // });

  // const result = Name.safeParse(req.params);
  // if (!result.success) return res.status(400).send(result.error);

  // const { name }: z.infer<typeof Name> = result.data;

  return res.status(200).send(`Kia Ora `);
});

helloRoutes.get("/", async(req:Request, res: Response) =>{
  return res.status(200).send("ello matey")
})

export default helloRoutes;
