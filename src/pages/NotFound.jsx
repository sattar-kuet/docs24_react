import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/common/LoadingButton";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            {"Something's missing."}
          </p>
          <p className="mb-4 text-lg font-normal text-gray-500 ">
            {
              "Sorry, we can't find that page. You'll find lots to explore on the home page."
            }
          </p>
          <div className="flex justify-center mt-6">
            <CustomButton
              color="pink"
              type="button"
              onClick={() => navigate("/")}
              text={
                <span className="flex items-center gap-3 ">
                  <MdOutlineArrowBack fontSize="1.3rem" /> Back to Dashboard
                </span>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
