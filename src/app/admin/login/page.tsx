import { Logo } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
        <div className="text-center">
          <Logo tagline="Content dashboard" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
