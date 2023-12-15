import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

/**
 * Sets up the layout for the given React component.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children of the component.
 * @return {Promise<void>} The result of the setup.
 */
export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
}
