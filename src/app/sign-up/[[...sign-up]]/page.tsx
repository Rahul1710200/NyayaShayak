import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div  className="w-full ml-[35vw] overflow-hidden z-50 mt-[3vw]">

        <SignUp afterSignUpUrl="/" />
    </div>

  )
}
