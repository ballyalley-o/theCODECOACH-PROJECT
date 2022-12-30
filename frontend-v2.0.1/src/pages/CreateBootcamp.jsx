import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Select from "react-select";
import Switch from "@mui/material/Switch";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";
import { createBootcamp, reset } from "../features/bootcamps/bootcampSlice";
import Spinner from "../components/Spinner";
import data from "../utilities/multipleSelect"





function CreateBootcamp() {
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

//   //clear from cache/ persists from local storage
// useEffect(() => {
//   const cache = window.localStorage.getItem('bootcamp_cache');
//   if (cache !== null ) setFormData(JSON.parse(cache))
// }, [])

// useEffect(() => {
//   window.localStorage.setItem('bootcamp_cache', JSON.stringify(formData))
// }, [formData])

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
            <label htmlFor="name">Bootcamp Name</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="phone">Phone</label>
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
            <label htmlFor="address">Address</label>
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
            <label htmlFor="website">website</label>
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
            <label htmlFor="jobGuarantee">Job Guarantee</label>
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
                    `Job Guarantee: ${" "} ${jobGuarantee === true ? "false" : "true"}`
                  )
                )
              }
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="housing">Housing</label>
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
            <label htmlFor="jobAssistance">Job Assistance</label>
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
            <label htmlFor="acceptGi">Accept Gi</label>
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
                value={data.filter(
                  (obj) => selected.includes(obj.value)
                  //push to careers
                )}
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
                {/* <MenuItem value="Web Development">Web Development </MenuItem>
                <MenuItem value="Mobile Development">
                  "Mobile Development"
                </MenuItem>
                <MenuItem value="UI/UX">UI/UX</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Software Engineering">
                  Software Engineering
                </MenuItem>
                <MenuItem value="FRONT-END Web Development">
                  FRONT-END Web Development
                </MenuItem>
                <MenuItem value="BACK-END Web Development">
                  BACK-END Web Development
                </MenuItem>
                <MenuItem value="FULL_STACK Web Development">
                  FULL_STACK Web Development
                </MenuItem>
                <MenuItem value="Dev Ops">Dev Ops</MenuItem>
                <MenuItem value="Web Design & Development">
                  Web Design & Development
                </MenuItem>
                <MenuItem value="Data Science Program">
                  Data Science Program
                </MenuItem>
                <MenuItem value="Software QA">Software QA</MenuItem>
                <MenuItem value="Mastering Web Designing">
                  Mastering Web Designing
                </MenuItem>
                <MenuItem value="Android App Web Development">
                  Android App Web Development
                </MenuItem>
                <MenuItem value="Meta">Meta</MenuItem>
                <MenuItem value="IBM Data Science">IBM Data Science</MenuItem>
                <MenuItem value="Apple iOS Web Apps Development">
                  Apple iOS Web Apps Development
                </MenuItem>
                <MenuItem value="Back-end">Back-End</MenuItem> */}
              </Select>
            </FormControl>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
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
            <button className="btn btn-block">PUBLISH</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateBootcamp