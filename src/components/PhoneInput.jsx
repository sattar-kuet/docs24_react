import { Icon } from "@iconify/react";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en";

export default function PhoneInput({
  register,
  setValue,
  resetField,
  defaultData,
}) {
  const [defaultCountry, setDefaultCountry] = useState({
    iso_country_code: defaultData?.iso_country_code
      ? defaultData?.iso_country_code
      : "BD", // iso country code --> BD

    country_code: defaultData?.country_code
      ? defaultData?.country_code
      : `+${getCountryCallingCode("BD")}`, // country code --> +880
  });

  const handleClick = (country) => {
    // set default country
    setDefaultCountry({
      iso_country_code: country,
      country_code: `+${getCountryCallingCode(country)}`,
    });
    // reset phone field when change country
    resetField("phone", { defaultValue: "" });
  };

  useEffect(() => {
    // set iso country code --> BD
    setValue("iso_country_code", defaultCountry?.iso_country_code, {
      shouldValidate: true,
    });
    // set country code --> +880
    setValue("country_code", defaultCountry?.country_code, {
      shouldValidate: true,
    });
  }, [setValue, defaultCountry]);

  return (
    <>
      <div className="border mt-1 border-gray-300 flex items-center h-[42px] hover:border-gray-500 transition-all duration-300">
        <Menu placement="bottom-start">
          <MenuHandler>
            <Button
              ripple={false}
              variant="text"
              className="flex h-10 items-center gap-2 rounded-none border-none bg-blue-gray-500/10 pl-3 hover:bg-blue-gray-500/10 focus:bg-blue-gray-500/10"
            >
              <Icon
                icon={`flag:${defaultCountry?.iso_country_code?.toLowerCase()}-4x3`}
              />
              {defaultCountry?.country_code}
            </Button>
          </MenuHandler>
          <MenuList className="max-h-[16rem] max-w-[20rem] z-[9999]">
            {getCountries()?.map((country, index) => {
              return (
                <MenuItem
                  key={index}
                  value={name}
                  className="flex items-center gap-2"
                  onClick={() => handleClick(country)}
                >
                  {/* <Icon icon={`flag:${country?.toLowerCase()}-4x3`} /> */}
                  {en[country]}
                  <span className="ml-auto">
                    +{getCountryCallingCode(country)}
                  </span>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <input
          type="text"
          className="text-gray-900 text-sm font-normal outline-none w-full h-full px-3"
          placeholder="Enter your phone number"
          {...register("phone")}
        />
      </div>
    </>
  );
}
