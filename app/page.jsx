
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        quotr
        <br className="max-md:hidden">
        </br>
        <span className="green_gradient text-center"> Share inspiring quotes!</span>
      </h1>
      <p className="desc text-center">quoter is a quotes marketplace
      </p>
     <Feed />
    </section>
  )
}

export default Home
