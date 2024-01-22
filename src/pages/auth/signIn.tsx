import { signIn } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const sigbInForm = z.object({
  email: z.string().email(),
});

type SignInForm = z.infer<typeof sigbInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "",
    },
  });

  const { mutateAsync: authenticate } = useMutation({ mutationFn: signIn });

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ email: data.email });

      toast.success("Enviamos um link de autenticão para seu e-mail!");
    } catch (error) {
      toast.error("Ocorreu um erro ao enviar o link de autenticação!");
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[340px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tighter">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>

          <Button asChild className="right-4 top-4" variant="link">
            <Link to="/sign-up">Novo por aqui? Crie sua conta!</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
