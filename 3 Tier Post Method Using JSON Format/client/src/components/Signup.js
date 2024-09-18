import React, { useRef } from "react";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let emailInputRef = useRef();
  let selectedGender;
  let selectedMS;
  let paraRef = useRef();
  let salutaion = "";
  let languagesKnown = {
    tel: false,
    hindi: false,
    eng: false,
  };


 
  let createAccount = () => {
    if (selectedGender === "Male") {
      salutaion = "Mr.";
    } else {
      if (selectedGender === "Female") {
        if (selectedMS === "Single") {
          salutaion = "Miss.";
        } else {
          salutaion = "Mrs.";
        }
      }
    }
    paraRef.current.innerHTML = `${salutaion} ${firstNameInputRef.current.value} ${lastNameInputRef.current.value} your account has been created.🤝`;
  };

  let postMethod = async ()=>{

  
    let myHeader = new Headers();
    myHeader.append("content-type","application/json");

    let sendData = {
        firstName:firstNameInputRef.current.value,
        lastName:lastNameInputRef.current.value,
        email:emailInputRef.current.value,
        gender:selectedGender,
        maritalStatus:selectedMS,
        languages:`${languagesKnown.tel === false ? "Telugu" : ""},${languagesKnown.hindi === false ? "Hindi" : ""},${languagesKnown.eng === false ? "English" : ""}`
    }
    console.log(sendData);

    let requestOptions = {
        method:"POST",
        headers:myHeader,
        body:JSON.stringify(sendData),
    }

    let jsonData = await fetch("http://localhost:2345/Signup",requestOptions);
    let jsoData = await jsonData.json();
    console.log(jsoData.msg);
 
  }

  return (
    <div>
      <form className="form">
        <div>
          <label className="label">First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label className="label">Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label className="label">Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label className="label">Gender</label>
          <input
            type="radio"
            name="gender"
            onChange={(eo) => {
              if (eo.target.checked === true) {
                selectedGender = "Male";
              }
            }}
          ></input>
          <label className="innerLabel">Male</label>
          <input
            type="radio"
            name="gender"
            onChange={(eo) => {
              if (eo.target.checked === true) {
                selectedGender = "Female";
              }
            }}
          ></input>
          <label className="innerLabel">Female</label>
        </div>
        <div>
          <label className="label">Marital Status</label>
          <input
            type="radio"
            name="ms"
            onChange={(eo) => {
              if (eo.target.checked === true) {
                selectedMS = "Single";
              }
            }}
          ></input>
          <label className="innerLabel">Single</label>
          <input
            type="radio"
            name="ms"
            onChange={(eo) => {
              if (eo.target.checked === true) {
                selectedMS = "Married";
              }
            }}
          ></input>
          <label className="innerLabel">Married</label>
        </div>
        <div>
          <label className="label">Languages</label>
          <input type="checkbox"></input>
          <label
            className="innerLabel"
            onChange={(eo) => {
              languagesKnown.tel = eo.target.checked;
            }}
          >
            Telugu
          </label>
          <input type="checkbox"></input>
          <label
            className="innerLabel"
            onChange={(eo) => {
              languagesKnown.hindi = eo.target.checked;
            }}
          >
            Hindi
          </label>
          <input type="checkbox"></input>
          <label
            className="innerLabel"
            onChange={(eo) => {
              languagesKnown.eng = eo.target.checked;
            }}
          >
            English
          </label>
        </div>
        <br></br>
        <div>
          <button
            type="button"
            onClick={() => {
              createAccount();
              postMethod();
            }}
          >
            Signup(JSON)
          </button>

          <p ref={paraRef}></p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
