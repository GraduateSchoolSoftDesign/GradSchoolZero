import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useInfractions = () => {
  // Function to add a warning
  const addWarning = async (userInfo, reason, warningCntVal) => {
    await fetch("http://localhost:2543/warnings", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: uuidv4(),
        date: new Date(),
        user: {
          id: userInfo.id,
          name: userInfo.name,
        },
        reason,
        value: warningCntVal,
      }),
    });

    // Increase warning count on user
    const userInfoRes = await fetch(
      `http://localhost:2543/users/${userInfo.id}`
    );
    const userData = await userInfoRes.json();
    const warningCnt = +userData.warningCnt || 0;

    await fetch(`http://localhost:2543/users/${userInfo.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        warningCnt: warningCnt + warningCntVal,
      }),
    });
  };

  // Remove 1 warning from the warning counter on a user
  const remove1WarningCnt = async (userId) => {
    const userInfoRes = await fetch(`http://localhost:2543/users/${userId}`);
    const userData = await userInfoRes.json();
    let warningCnt = +userData.warningCnt || 0;
    if (warningCnt > 0) warningCnt--;

    await fetch(`http://localhost:2543/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        warningCnt: warningCnt,
      }),
    });
  };

  /* 
    Find all the warnings the user have (include past warnings that may have lead
    to a previous suspension
  */
  const getUserWarnings = async (id) => {
    const res = await fetch(`http://localhost:2543/warnings?userId=${id}`);
    const data = await res.json();
    return data;
  };

  /*
    Get a list of all users with more than 3 warnings such that we can suspend
    them once the time comes
  */
  const getNewSuspendedUsers = async () => {
    const res = await fetch("http://localhost:2543/users?warningCnt_gte=3");
    const data = await res.json();
    return data;
  };

  // Send a comaplaint request
  const submitComplaint = async (reporter, offender, reason, extra) => {
    console.log(reporter, offender, reason, extra);
    const complaintObj = {
      id: uuidv4(),
      reporter: {
        id: reporter.id,
        name: reporter.name,
        type: reporter.type,
      },
      offender: {
        id: offender.id,
        name: offender.name,
        type: offender.type,
      },
      reason,
      extra,
    };

    const postResponse = await fetch("http://localhost:2543/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaintObj),
    });

    if (postResponse.ok)
      return {
        status: "success",
        message: "Successfully submitted complaint.",
      };
    return { status: "error", message: "Failed to submit report to server" };
  };

  return {
    addWarning,
    remove1WarningCnt,
    getUserWarnings,
    getNewSuspendedUsers,
    submitComplaint,
  };
};

export default useInfractions;