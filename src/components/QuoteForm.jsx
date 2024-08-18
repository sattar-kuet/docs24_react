import { Controller } from "react-hook-form";
import { Checkbox } from "@material-tailwind/react";
import GST_CalculationFields from "./GST_CalculationFields";
import CommonMailClientAddressForm from "./CommonMailClientAddressForm";

const QuoteForm = ({ control, watch, setValue }) => {
  return (
    <div>
      <Controller
        name="create_invoice"
        id="create_invoice"
        control={control}
        render={({ field: { onChange, value, ...rest } }) => {
          return (
            <label
              htmlFor="create_invoice"
              className="flex items-center justify-between cursor-pointer mt-3"
            >
              Create Invoice?
              <Checkbox
                color="lightBlue"
                {...rest}
                id="create_invoice"
                checked={value}
                onChange={onChange}
              />
            </label>
          );
        }}
      />

      <CommonMailClientAddressForm control={control} />

      <GST_CalculationFields
        control={control}
        watch={watch}
        setValue={setValue}
      />
    </div>
  );
};

export default QuoteForm;
