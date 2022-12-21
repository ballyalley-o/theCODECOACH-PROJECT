import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlexBetween } from "../components/FlexBetween";
import { useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";
import { createBootcamp, reset } from "../features/bootcamps/bootcampSlice";
import Spinner from "../components/Spinner";



function Bootcamps() {
    const {user} = useSelector((state) => state.auth);
    const {bootcamps, isLoading, isError, isSuccess, message} = useSelector((state) => state.bootcamps);
    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState('')
    const [averageCost, setAverageCost] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState("");
    const [careers, setCareers] = useState('');
    const [housing, setHousing] = useState("");
    const [jobAssistance, setJobAssistance] = useState("");
    const [jobGuarantee, setJobGuarantee] = useState("");
    const [acceptGi, setAcceptGi] = useState("");
    const [photo, setPhoto] = useState("");


    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useEffect(() => {
    //   if(isError) {
    //     toast.error(message);
    //   }

    //   if(isSuccess) {
    //     dispatch(reset())
    //     navigate('/bootcamps')
    //   }

    //   dispatch(reset())
    // }, [dispatch, isError, isSuccess, message, navigate])



  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createBootcamp({
      name,
      email,
      phone,
      address,
      jobGuarantee,
      housing,
      averageCost,
      careers,
      description
  }))
      .unwrap()
      .then(() => {


        navigate("/tickets");
        toast.success("New ticket created!");
      })
      .catch(toast.error);
  };

  return (
    <>
      <FlexBetween>
        <section className="heading">
          <h1>Create a Bootcamp</h1>
          <p className="">Publish your DEV camp</p>
        </section>

        <form onSubmit={onSubmit}>
          <section className="form">
            <div className="form-group">
              <label htmlFor="name">Bootcamp Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                value={email}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">averageCost</label>
              <input
                type="text"
                className="form-control"
                value={averageCost}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobGuarantee">Job Guarantee</label>
              <input
                type="checkbox"
                className="form-control"
                value={jobGuarantee}
                disabled
              />
            </div>{" "}
            <div className="form-group">
              <label htmlFor="housing">Housing</label>
              <input
                type="checkbox"
                className="form-control"
                value={housing}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobAssistance">Job Assistance</label>
              <input
                type="checkbox"
                className="form-control"
                value={jobAssistance}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="acceptGi">Accept Gi</label>
              <input
                type="checkbox"
                className="form-control"
                value={acceptGi}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="careers">Careers/Courses</label>
              <select
                name="careers"
                id="careers"
                multiple="multiple"
                value={careers}
                onChange={(e) => setCareers(e.target.value)}
              >
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">"Mobile Development"</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Business">Business</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="FRONT-END Web Development">
                  FRONT-END Web Development
                </option>
                <option value="BACK-END Web Development">
                  BACK-END Web Development
                </option>
                <option value="FULL_STACK Web Development">
                  FULL_STACK Web Development
                </option>
                <option value="Dev Ops">Dev Ops</option>
                <option value="Web Design & Development">
                  Web Design & Development
                </option>
                <option value="Data Science Program">
                  Data Science Program
                </option>
                <option value="Software QA">Software QA</option>
                <option value="Mastering Web Designing">
                  Mastering Web Designing
                </option>
                <option value="Android App Web Development">
                  Android App Web Development
                </option>
                <option value="Meta">Meta</option>
                <option value="IBM Data Science">IBM Data Science</option>
                <option value="Apple iOS Web Apps Development">
                  Apple iOS Web Apps Development
                </option>
                <option value="Back-end">Back-End</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn btn-block">PUBLISH</button>
            </div>
          </section>
        </form>
      </FlexBetween>
    </>
  );
}

export default Bootcamps