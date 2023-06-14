import { Request, Response } from 'express';
import UserService from '../service/UserService';

interface AuthenticatedRequest extends Request {
  token: any;
}

export default class UserController {
  constructor(
    private UsersService = new UserService(),
  ) { }

  public async makeLogin(req: Request, res: Response) {
    const serviceResponse = await this.UsersService.loginService(req.body);
    if (serviceResponse.status) {
      return res.status(serviceResponse.status).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }

  public async getRole(req: AuthenticatedRequest, res: Response) {
    const { token } = req;
    const role = await this.UsersService.getRoleService(token.id);
    return res.status(200).json({ role: role.data });
  }
}
