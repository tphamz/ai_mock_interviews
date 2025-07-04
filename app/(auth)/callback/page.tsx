import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const AuthCallbackPage = async () => {
  const auth = await isAuthenticated();

  if (auth.status === 200 || auth.status == 201) {
    redirect("/dashboard");
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    redirect("/");
  }
};

export default AuthCallbackPage;
