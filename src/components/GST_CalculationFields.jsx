import { useFieldArray } from "react-hook-form";
import CommonInputField from "./common/CommonInputField";
import CustomButton from "./common/LoadingButton";
import { MdAdd, MdClose } from "react-icons/md";
import { Tooltip, Typography } from "@material-tailwind/react";
import { useEffect } from "react";

const GST_CalculationFields = ({ control, watch, setValue }) => {
  // ===================== HOOKS =====================
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // ===================== CALCULATIONS =====================
  const subTotal = watch("items")?.reduce((acc, curr) => {
    return (acc =
      acc + parseFloat(curr.quantity) * parseFloat(curr.unit_price));
  }, 0);

  const totalGst = watch("items")?.reduce((acc, curr) => {
    if (curr.isGst) {
      return (acc = acc + parseFloat(curr.gst));
    } else {
      return (acc = acc + 0);
    }
  }, 0);

  const totalAUD = subTotal + totalGst;

  // ================== WATCH VALUES ==================
  const itemQuantity = (index) => watch(`items[${index}].quantity`);
  const itemUnitPrice = (index) => watch(`items[${index}].unit_price`);
  const isGst = (index) => watch(`items[${index}].isGst`);

  // ================== FUNCTIONS ==================
  // AUD = Quantity * Unit Price

  // set gst value with calculation function
  const handleSetGstValue = (isGstCondition, index, aud) => {
    // set gst value
    if (isGstCondition) {
      setValue(`items[${index}].gst`, (parseFloat(aud) * 10) / 100);
    } else {
      setValue(`items[${index}].gst`, 0);
    }
  };

  // ================== SIDE EFFECTS ==================
  useEffect(() => {
    setValue("sub_total", subTotal);
    setValue("total_gst", totalGst);
    setValue("total", totalAUD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subTotal, totalGst, totalAUD]);

  return (
    <div>
      <div className="flex justify-between items-center gap-1 bg-gray-100 my-3">
        <CustomButton
          color="blue"
          type={"button"}
          className="text-xl"
          onClick={() => {
            append({
              item: "M2",
              description: "",
              quantity: 0,
              unit_price: 0,
              gst: 0,
              isGst: false,
            });
          }}
          text={<MdAdd />}
        />

        <div className="flex flex-wrap gap-y-1 gap-x-2 pr-2 justify-end">
          <Typography color="black" variant="small" className="font-semibold">
            Sub Total: {subTotal || 0}
          </Typography>
          <Typography color="black" variant="small" className="font-semibold">
            Total GST: {totalGst || 0}
          </Typography>
          <Typography color="black" variant="small" className="font-semibold">
            Total AUD: {totalAUD || 0}
          </Typography>
        </div>
      </div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="bg-gray-100 mt-2 p-3 relative">
            <div className="grid grid-cols-2 gap-1">
              <CommonInputField
                control={control}
                formData={[
                  {
                    name: `items[${index}].item`,
                    type: "select",
                    label: "Select Item",
                    required: true,
                    disableMargin: true,
                    options: [
                      { label: "M2", value: "M2" },
                      { label: "M3", value: "M3" },
                      { label: "Lm", value: "LM" },
                      { label: "Ton", value: "Ton" },
                      { label: "Kg", value: "Kg" },
                      { label: "Item", value: "Item" },
                      { label: "Box", value: "Box" },
                      { label: "Other", value: "Other" },
                      { label: "None", value: "None" },
                    ],
                  },
                  {
                    name: `items[${index}].description`,
                    type: "text",
                    label: "Description",
                    required: true,
                    placeholder: "Description",
                    disableMargin: true,
                  },
                  {
                    name: `items[${index}].quantity`,
                    type: "number",
                    label: "Quantity",
                    required: true,
                    placeholder: "Quantity",
                    disableMargin: true,
                    manualOnChange: ({ target }) => {
                      // calculation gst = (AUD *10)/100

                      // get aud
                      const aud = target.value * itemUnitPrice(index);

                      const getIsGst = isGst(index);

                      handleSetGstValue(getIsGst, index, aud);
                    },
                  },
                  {
                    name: `items[${index}].unit_price`,
                    type: "number",
                    label: "Unit Price",
                    required: true,
                    placeholder: "Unit Price",
                    disableMargin: true,
                    manualOnChange: ({ target }) => {
                      // calculation gst = (AUD *10)/100

                      // get aud
                      const aud = itemQuantity(index) * target.value;

                      const getIsGst = isGst(index);

                      handleSetGstValue(getIsGst, index, aud);
                    },
                  },
                  {
                    name: `items[${index}].isGst`,
                    type: "select",
                    label: "Select GST",
                    required: true,
                    disableMargin: true,
                    manualOnChange: (e) => {
                      // calculation gst = (AUD *10)/100

                      // get aud
                      const aud = itemQuantity(index) * itemUnitPrice(index);

                      handleSetGstValue(e.value, index, aud);
                    },

                    options: [
                      { label: "GST", value: true },
                      { label: "No GST", value: false },
                    ],
                  },
                ]}
              />

              <Typography
                color="black"
                variant="small"
                className="font-semibold"
              >
                Amount AUD:{" "}
                {
                  // calculation of Amount AUD = Quantity * Unit Price;
                  itemQuantity(index) * itemUnitPrice(index)
                }
              </Typography>

              {isGst(index) && (
                <Typography
                  color="black"
                  variant="small"
                  className="font-semibold"
                >
                  GST: {watch(`items[${index}].gst`)}
                </Typography>
              )}
            </div>

            {/* REMOVE INDIVIDUAL FIELD ARRAY ITEM */}
            <Tooltip content="Remove Item">
              <button
                size="sm"
                onClick={() => remove(index)}
                type="button"
                color="red"
                className="absolute -top-2 -right-2  rounded-full p-1 bg-red-700 text-red-50 hover:bg-red-800 hover:text-red-100"
              >
                <MdClose />
              </button>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

export default GST_CalculationFields;
