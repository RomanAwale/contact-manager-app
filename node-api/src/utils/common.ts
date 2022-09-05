import { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import jwt from "jsonwebtoken";


export const sendErrorResponse = (res: ServerResponse, statusCode:number, message: string) => {
    res.writeHead(statusCode, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify({message}));
};

export const getRequestBody = (req: IncomingMessage): Promise<string> => {
    return new Promise((resolve, reject) => {
        try{
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });   

        } catch(error) {
            reject(Error);
        }
    });
};

export const writeDataToFile =(filePath: string, data: object) => {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
};

export const createAccessToken = (data: any): string => {
    const accessToken = jwt.sign(data, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRATION_INTERVAL as string,
    });
  
    return accessToken;
  };