import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private app: any;

  constructor() { 
    this.app = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
      })
    });
  }

  async use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization;
    if (!token) throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    const decodedToken = await this.app.auth().verifyIdToken(token.replace('Bearer ', ''))
      .catch(() => { throw new HttpException('Token not valid', HttpStatus.UNAUTHORIZED) });
    
    req['firebaseUser'] = { email: decodedToken.email, uid: decodedToken.uid }
    
    next();
  }
}
