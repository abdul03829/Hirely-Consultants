export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  joinDate: Date;
  status: 'Active' | 'Inactive' | 'On Leave';
  avatar?: string;
}
