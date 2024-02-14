import React from "react";
import { useGetTeamInfoQuery } from "../../features/taskManager/taskManagerApi";
import Error from "../ui/error";

export default function TeamList() {
  const { data: team, isLoading, isError } = useGetTeamInfoQuery();
  //  decide what to render
  let content = null;
  if (isLoading) content = <p>loading .......</p>;
  else if (!isLoading && isError)
    content = <Error message={"Their was an error ocuaurd on Fetch Team"} />;
  else if (!isLoading && !isError && team?.length === 0)
    content = <Error message={"No Team Found"} />;
  else if (!isLoading && !isError && team?.length > 0) {
    content = team.map((t) => (
      <div key={t.id} className="checkbox-container">
        <img
          src={require("../../assets" + t.avatar)}
          alt="Membar Avatar"
          className="team-avater"
        />
        <p className="label">{t.name}</p>
      </div>
    ));
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
