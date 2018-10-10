export class EmployeeRole {
  _id: string;
  name: string;
  golbalPerms?: string; // interfaces allow fields to be optional
  privatePerms?: string; // interfaces allow fields to be optional
}
