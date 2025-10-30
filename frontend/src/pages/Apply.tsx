import { useAuth } from '../context/AuthContext';


export default function Apply() {
  const{user}=useAuth();
  if (!user) return <div>Please login to apply</div>;
  return <div className="p-8 text-center text-2xl">Apply Page</div>;
}