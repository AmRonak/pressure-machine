'use client';

import AxiosHCO from "@/components/axiosHOC/AxiosHCO";
import Navigation from "@/components/buttons/Navigation";
import RecipeInput from "@/components/inputs/RecipeInput";
import { toatsConfig } from "@/constants/toast";
import { setDataChanged } from "@/redux/slices/devices";
import { recipeSchema } from "@/schema/recipeSchema.yup";
import handleAxiosRequest from "@/util/handleRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const STABILIZATION_TIME = "stabilizationTime";
const INITIAL_PRESSURE = "initialPressure";
const SET_PRESSURE = "setPressure";
const TEST_TIME = "testTime";
const LEAK_PRESSURE = "leakTestPressure";
const LOWER_PRESSURE = "lowerTestPressure";
const COMMENT = "comment";

const Recipe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    resolver: yupResolver(recipeSchema),
    mode: "onChange",
    values: {
      pressurePursuingPressure: 0,
      ...initialData,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const { data } = await handleAxiosRequest({ api: 'recipeSetting' });
        const { data: masterData } = await handleAxiosRequest({
          api: "masterParameter",
        });
        delete data.createdAt;
        delete data.updatedAt;
        delete data.macId;
        delete data.id;
        setInitialData({
          ...data,
          pressurePursuingPressure: masterData?.pressurePursuingPressure ?? "",
        }); // Store initial data for comparison
        reset({...data, comment: ''});
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchUserData();
  }, [reset, setIsError]);

  useEffect(() => {
    const currentValues = getValues();
    const hasChanged = Object.keys(initialData).some(
      (key) => {
        if(key === 'comment'){
          if(currentValues['comment'].length !== 0) return true;
          return false;
        }
        const val = +currentValues[key];
        return val !== initialData[key]
      }
    );
    setIsChanged(isDirty && hasChanged);
  }, [watchedValues, isDirty, getValues, initialData]);
  
  const onSubmit = async (payloadData) => {
    try {
      await handleAxiosRequest({
        api: 'recipeSetting',
        method: 'put',
        payloadData,
      });
      toast.success('recipe saved successfully', toatsConfig);
      dispatch(setDataChanged());

      // ✅ Set new initial data to current values
      setInitialData(payloadData);
      
      // ✅ Reset form state to mark it as "not dirty"
      reset({...payloadData, comment: ''});
    } catch (error) {
      toast.error(error.response.data.message, toatsConfig);
    }
  }

  return (
    <div className="grid-flow-col mx-auto px-16 py-10">
      <div className="flex justify-between items-center">
        <p className="text-5xl lg:text-6xl font-bold">
          Recipe
        </p>
        <Navigation />
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 flex justify-center">
          <Image
            src={`/images/fast-time.svg`}
            width={0}
            height={0}
            alt="stabilization icon"
            className="w-24 lg:w-32 xl:w-36 -ml-20"
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <Image 
            src={`/images/pressure-gauge.svg`}
            width={0}
            height={0}
            alt="time icon"
            className="w-20 lg:w-28 xl:w-32"
          />
        </div>
        </div>
        <AxiosHCO isLoading={isLoading} isError={isError} errorMessage="Failed to load recipe data, please try sometimes later.">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-flow-row gap-y-20 my-10">
            <div className="grid grid-flow-col grid-cols-3 gap-28 gap-y-10">
              <div className="grid grid-flow-row col-span-1 gap-20">
                <RecipeInput
                  id={STABILIZATION_TIME}
                  labelText={"STABILIZATION TIME"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  containerStyles={''}
                  inputStyle={'w-full'}
                  type={'Number'}
                />
                <RecipeInput
                  id={TEST_TIME}
                  labelText={"TEST TIME"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  containerStyles={''}
                  inputStyle={'w-full mt-8'}
                  type={'Number'}
                />
              </div>
              <div className="grid grid-flow-row col-span-1 gap-20">
                <RecipeInput
                  id={INITIAL_PRESSURE}
                  labelText={"INITIAL PRESSURE"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  containerStyles={''}
                  inputStyle={'w-full'}
                  type={'Number'}
                />
                <RecipeInput
                  id={LEAK_PRESSURE}
                  labelText={"LEAK TEST"}
                  labelText2={"LIMIT PRESSURE"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  containerStyles={''}
                  inputStyle={'w-full'}
                  labelStyles={'text-nowrap'}
                  type={'Number'}
                />
              </div>
              <div className="grid grid-flow-row col-span-1 gap-20">
                <RecipeInput
                  id={SET_PRESSURE}
                  labelText={"SET PRESSURE"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  containerStyles={''}
                  inputStyle={'w-full'}
                  type={'Number'}
                />
                <RecipeInput
                  id={LOWER_PRESSURE}
                  labelText={"LOWER TEST"}
                  labelText2={"LIMIT PRESSURE"}
                  register={register}
                  validationSchema={{}}
                  errors={errors}
                  labelStyles={'text-nowrap'}
                  inputStyle={'w-full'}
                  type={'Number'}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 items-center xl:gap-48">
              <RecipeInput
                id={COMMENT}
                labelText={"COMMENT"}
                register={register}
                validationSchema={{}}
                errors={errors}
                inputStyle={'w-full'}
                containerStyles={'w-full'}
              />
              <div className="flex flex-col items-center">
                <button type="submit" disabled={!isChanged} className={`${!isChanged ? 'opacity-50' : 'opacity-100'}`}>
                  <Image
                    src={'/images/save-btn.svg'}
                    width={130}
                    height={130}
                    alt={`save recipe button`}
                  />
                </button>
              </div>
            </div>
          </form>
        </AxiosHCO>
    </div>
  );
};

export default Recipe;
