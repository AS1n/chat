export class Role {
  id: string;
  name: string;

  static cloneBase(role: Role): Role {
    let clonedRole: Role = new Role();
    clonedRole.id = role.id;
    clonedRole.name = role.name;
    return clonedRole;
  }

  constructor() {
    this.id = '2';
    this.name = 'USER';
  }

}
