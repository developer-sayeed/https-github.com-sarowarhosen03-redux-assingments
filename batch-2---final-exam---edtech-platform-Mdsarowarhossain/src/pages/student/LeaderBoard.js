import MyRankBoard from "../../components/LeaderBoard/MyRankBoard";
import LeaderBoardTable from "../../components/LeaderBoard/LeaderBoardTable";
import { useGetLeaderBoardQuery } from "../../features/student/studentApi";
import ContentLoader from "../../components/ui/ContentLoader";
import Error from "../../components/ui/Error";
import getLeaderBoard from "../../utils/getLeaderBoard";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/student/studentSelectors";

const LeaderBoard = () => {
  document.title = `${process.env.SITE_TITLE} | LeaderBoard`;
  const { data, isLoading, isError } = useGetLeaderBoardQuery();
  const { id } = useSelector((state) => selectUser(state, false));

  //decide what to show
  let content;
  if (isLoading) {
    content = <ContentLoader />;
  } else if (!isLoading && isError) {
    content = <Error message="Error ocard While Fetching Leaderboard Data" />;
  } else if (!isLoading && !isError && data) {
    const [myRank, leaderboard] = getLeaderBoard(data, id);
    content = (
      <>
        <MyRankBoard myRank={myRank} />
        <LeaderBoardTable leaderboard={leaderboard} myid={id} />
      </>
    );
  }
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">{content}</div>
    </section>
  );
};

export default LeaderBoard;
