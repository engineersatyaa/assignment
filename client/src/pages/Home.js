import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import Card from "../components/Card";

function Home() {
  return (
    <>
      <Header />

      <Wrapper className="border">
        <div>
          <Card />
        </div>
      </Wrapper>
      {/* Footer */}
    </>
  );
}

export default Home;
