import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Input } from "@mui/material";
import Select from "react-select";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBootcamp } from "../features/bootcamps/bootcampSlice";
import Spinner from "../components/Spinner";
import data from "../utilities/multipleSelect"



function CreateBootcamp(props) {
  const { user } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    averageCost: "",
    website: "",
    address: "",
    careers: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
    photo: "",
  });




  const { name,
          email,
          phone,
          description,
          averageCost,
          website,
          address,
          careers,
          housing,
          jobAssistance,
          jobGuarantee,
          acceptGi,
          photo   }
          = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.bootcamps);

  const onChange = (e) => {

     setFormData((prevState) => ({
       ...prevState,
       [e.target.name]: e.target.value,
     }));
   };

   const onChangeSelect = (e) => {
    setSelected(Array.isArray(e) ? e.map(x => x.value) : [])

    setFormData((prevState) => ({
     ...prevState,  careers: Array.isArray(e) ? e.map(x => x.value) : []
                }))

}
  const onSubmit = (e) => {
    e.preventDefault();

    const bootcampData = {
      name,
      email,
      phone,
      description,
      averageCost,
      website,
      address,
      careers,
      housing,
      jobAssistance,
      jobGuarantee,
      acceptGi,
      photo
    }

    dispatch(
      createBootcamp(bootcampData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }),
    )
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success(`"Your bootcamp has been created, & published!"`);
      })
      .catch(toast.error);
  };


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Create a Bootcamp</h1>
        <p className="">Publish your DEV camp</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <InputLabel htmlFor="name">Bootcamp Name</InputLabel>
            <input
              name="name"
              type="text"
              id="name"
              className="form-control"
              value={name}
              placeholder="Bootcamp Name"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="email">Email</InputLabel>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="phone">Phone</InputLabel>
            <input
              name="phone"
              className="form-control"
              value={phone}
              onChange={(e) => onChange(e)}
              placeholder="Phone"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="averageCost">Cost</label>
            <input
              name="averageCost"
              type="number"
              className="form-control"
              min="100"
              value={averageCost}
              onChange={onChange}
              placeholder="Cost"
              required
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="address">Address</InputLabel>
            <input
              name="address"
              type="text"
              id="address"
              className="form-control"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="website">website</InputLabel>
            <input
              name="website"
              type="website"
              className="form-control"
              value={website}
              onChange={onChange}
              placeholder="www.website.com"
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="jobGuarantee">Job Guarantee</InputLabel>
            <Switch
              name="jobGuarantee"
              type="checkbox"
              onClick={() =>
                setFormData(
                  (prevState) => ({
                    ...prevState,
                    jobGuarantee: !jobGuarantee ? true : false,
                  }),
                  console.log(
                    `Job Guarantee: ${" "} ${
                      jobGuarantee === true ? "false" : "true"
                    }`
                  )
                )
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="housing">Housing</InputLabel>
            <Switch
              name="housing"
              type="checkbox"
              //boolean checkbox value is always true
              onClick={() =>
                setFormData(
                  (prevState) => ({
                    ...prevState,
                    housing: !housing ? true : false,
                  }),
                  console.log(
                    `Housing: ${" "} ${housing === true ? "false" : "true"}`
                  )
                )
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="jobAssistance">Job Assistance</InputLabel>
            <Switch
              name="jobAssistance"
              type="checkbox"
              onClick={() =>
                setFormData(
                  (prevState) => ({
                    ...prevState,
                    jobAssistance: !jobAssistance ? true : false,
                  }),
                  console.log(
                    `Job Assistance: ${" "} ${
                      jobAssistance === true ? "false" : "true"
                    }`
                  )
                )
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="acceptGi">Accept Gi</InputLabel>
            <Switch
              name="acceptGi"
              type="checkbox"
              onClick={() =>
                setFormData(
                  (prevState) => ({
                    ...prevState,
                    acceptGi: !acceptGi ? true : false,
                  }),
                  console.log(
                    `Accept GI: ${" "} ${acceptGi === true ? "false" : "true"}`
                  )
                )
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="careers">Careers/Courses</InputLabel>
            <FormControl sx={{ display: "flex" }}>
              <Select
                className="dropdown"
                name="careers"
                value={data.filter((obj) => selected.includes(obj.value))}
                onChange={onChangeSelect}
                options={data}
                isMulti
                required
              >
                {selected && (
                  <div style={{ marginTop: 20, lineHeight: "25px" }}>
                    <div>
                      <b>Selected Value: </b>
                      {JSON.stringify(selected, null, 2)}
                    </div>
                  </div>
                )}
              </Select>
            </FormControl>
          </div>
          <div className="form-group">
            <InputLabel htmlFor="description">Description</InputLabel>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              required
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <InputLabel htmlFor="photo">Photo</InputLabel>
            <Input
              type="file"
              id="photo"
              name="photo"
              sx={{ display: "flex", cursor: "pointer"}}
              className="form-control"
              onChange={onChange}
            ></Input>
          </div>
          <div className="form-group">
            <button className="btn btn-block">PUBLISH</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateBootcamp