import { Autocomplete } from "@mui/material";
import { addUser } from "../helpers/dataActions";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { getCountriesData } from "../server/server";
import { HAVE_AN_ACCOUNT } from "../constants/messages";

export default function RegisterInputs() {
  const [countriesData, setCountriesData] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getCountriesData(setCountriesData);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (await addUser(data)) {
          navigate("/");
        }
      })}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-row gap-5 sm:flex sm:flex-col sm:gap-3">
        <div className="flex flex-col gap-3">
          <input
            autoComplete="on"
            {...register("username")}
            name="username"
            className="input-primary"
            placeholder="Username"
          />

          <input
            autoComplete="on"
            {...register("gmailUser")}
            name="gmailUser"
            className="input-primary"
            placeholder="Email"
            type="email"
          />

          <input
            autoComplete="on"
            {...register("phone")}
            className="input-primary"
            placeholder="Phone"
            name="phone"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Autocomplete
            name="country"
            options={countriesData}
            style={{ width: 280, marginTop: 8, marginBottom: 8 }}
            renderInput={(params) => (
              <TextField {...register("country")} {...params} label="Country" />
            )}
          />
          <input
            autoComplete="on"
            {...register("userPassword")}
            type="password"
            name="userPassword"
            className="input-primary"
            placeholder="Password"
          />

          <input
            autoComplete="on"
            type="password"
            {...register("confirmPassword")}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input-primary"
          />
        </div>
      </div>

      <button type="submint" className="btn-primary">
        Register
      </button>

      <Link className="form-links" to="/">
        {HAVE_AN_ACCOUNT}
      </Link>
    </form>
  );
}
