export const validateLogin = (email,password)=>{
   if(!email.trim()) return "Email is required";
   if(!password.trim()) return "Password is required";
   if(!email.includes("@")) return "Invalid email";

   return "valid"
}