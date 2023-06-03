import { ExecutionContext, HttpException, createParamDecorator } from '@nestjs/common';

export const FirebaseUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const firebaseUID = request.firebaseUser?.uid as string;
        const email = request.firebaseUser?.email as string;
        if (!firebaseUID || !email) throw new HttpException('Something went wrong while authenticating', 500);

        return {firebaseUID, email}
    },
  );
