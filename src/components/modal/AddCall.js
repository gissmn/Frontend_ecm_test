import React, { useState } from "react";
import Button from "../core/Button";
import Modal from "../core/Modal";
import { Location } from "../../constans/location";
import LabelInput from "../core/LabelInput";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/homeIcon.svg";
import Input from "../core/Input";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CALLS, REGISTER_CALL } from "../../apollo/gql/Call/call";
import CallTable from "../CallTable";

export default function AddCall({ onClose }) {
  return <Modal onClose={onClose} title="Дуудлага бүртгэх" child={<Child onClose={onClose} />} />;
}

const Child = ({ onClose }) => {
  const [call, setCall] = useState({
    userId: "6268fb88fdc52cf5a606b110",
    operatorId: "626921d5cafee0df8efb7f66",
    name: "",
    detail: "",
    device: "web",
    type: "casual",
    category: "information",
    dueDate: "",
  });
  const { cityList, districtList, unitList } = Location;
  const [location, setLocation] = useState({ city: "Улаанбаатар", district: "Багануур", unit: "1" });
  const [fetchCalls, { loading, error, data }] = useLazyQuery(GET_CALLS);
  const [registerCall] = useMutation(REGISTER_CALL, {
    onError(e) {
      console.log(e);
    },
    onCompleted() {
      onClose();
    },
    refetchQueries: [{ query: GET_CALLS, variables: { status: "" }, fetchPolicy: "cache-first" }],
  });
  function cityChange(e) {
    setLocation({
      city: e.target.value,
      district: districtList[cityList.indexOf(e.target.value)][0],
      unit: e.target.value === "Улаанбаатар" ? "1" : "",
    });
  }
  function districtChange(e) {
    setLocation({ ...location, district: e.target.value, unit: location.city === "Улаанбаатар" ? "1" : "" });
  }
  return (
    <div>
      <h3 className="self-start font-bold text-sm">
        <UserIcon className="inline-block w-6 text-primary border-current border rounded-full mr-1" />
        Хэрэглэгчийн мэдээлэл
      </h3>
      <div className="flex gap-8">
        <div className="flex flex-col items-end gap-2">
          <LabelInput
            label="Хот / Аймаг"
            input={
              <select className="border" onChange={cityChange} value={location.city}>
                {cityList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            }
          />
          <LabelInput
            label="Сум / Дүүрэг"
            input={
              <select className="border" onChange={districtChange} value={location.district}>
                {districtList[cityList.indexOf(location.city)].map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            }
          />
          {location.city === "Улаанбаатар" && (
            <LabelInput
              label="Баг / Хороо"
              input={
                <select className="border" value={location.unit} onChange={(e) => setLocation({ ...location, unit: e.target.value })}>
                  {unitList[0].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              }
            />
          )}
          <LabelInput label="Байр, тоот" input={<Input />} />
          <LabelInput label="Дэлгэрэнгүй хаяг" input={<Input />} />
          <LabelInput label="Код, төрөл" input={<Input />} />
          <LabelInput label="Нэр" input={<Input />} />
          <LabelInput label="Утас" input={<Input />} />
          <LabelInput label="И-мэйл" input={<Input />} />
          <div className="flex gap-2">
            <Button title="Цэвэрлэх" classes="bg-gray-500" />
            <Button title="Хайх" handleClick={fetchCalls} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <LabelInput
            label="Дуудлагын нэр"
            input={<input className="border" value={call.name} onChange={(e) => setCall({ ...call, name: e.target.value })} />}
          />
          <div className="flex gap-4">
            <LabelInput
              label="Төрөл"
              input={
                <select defaultValue={call.type} className="border" onChange={(e) => setCall({ ...call, type: e.target.value })}>
                  <option value="casual">Энгийн</option>
                  <option value="emergency">Яаралтай</option>
                  <option value="replied">Шууд хариулсан</option>
                  <option value="special">Онцгой</option>
                </select>
              }
            />
            <LabelInput
              label="Ангилал"
              input={
                <select defaultValue={call.category} className="border" onChange={(e) => setCall({ ...call, category: e.target.value })}>
                  <option value="information">Мэдээлэл</option>
                  <option value="damage">Гэмтэл</option>
                  <option value="work">Ажил</option>
                  <option value="issue">Өргөдөл, Гомдол</option>
                </select>
              }
            />
          </div>
          <LabelInput
            label="Тайлбар"
            input={
              <textarea
                value={call.detail}
                className="border w-full resize-none"
                rows={4}
                onChange={(e) => setCall({ ...call, detail: e.target.value })}
              />
            }
          />
          <div className="flex justify-between flex-wrap">
            <LabelInput
              label="Веб"
              input={<input value={"web"} onChange={(e) => setCall({ ...call, device: e.target.value })} type="radio" name="device" defaultChecked />}
            />
            <LabelInput
              label="Утас"
              input={<input value={"mobile"} onChange={(e) => setCall({ ...call, device: e.target.value })} type="radio" name="device" />}
            />
            <LabelInput
              label="Апп"
              input={<input value={"app"} onChange={(e) => setCall({ ...call, device: e.target.value })} type="radio" name="device" />}
            />
            <LabelInput
              label="Оператор"
              input={<input value={"operator"} onChange={(e) => setCall({ ...call, device: e.target.value })} type="radio" name="device" />}
            />
            <LabelInput
              label="Колл Центер"
              input={<input value={"callCenter"} onChange={(e) => setCall({ ...call, device: e.target.value })} type="radio" name="device" />}
            />
          </div>
          <LabelInput label="Файл оруулах" input={<Input type="file" name="device" />} />
          <LabelInput label="Гүйцэтгэх хугацаа" input={<input type="date" onChange={(e) => setCall({ ...call, dueDate: e.target.value })} />} />
          <LabelInput
            label="Оператор"
            input={
              <select className="border">
                <option value={"Сонгох"}>Сонгох</option>
                <option value={"Ундармаа"}>Ундармаа</option>
              </select>
            }
          />
          <Button
            title="Дуудлага бүртгэх"
            classes="w-fit"
            handleClick={() =>
              registerCall({
                variables: call,
              })
            }
          />
        </div>
      </div>
      <hr className="my-4" />
      <h3 className="self-start font-bold text-sm">
        <HomeIcon className="inline-block w-6 text-primary border-current border rounded-full mr-1" />
        Байрны дуудлагууд
      </h3>
      <CallTable loading={loading} error={error} calls={data?.getCalls} />
    </div>
  );
};
