import React, { useState } from "react"
import { Link } from "gatsby"
import tw from "tailwind.macro"
import { connect } from "react-redux"
import { Button, Input } from "../components/common"
import Layout from "../components/layout/layout"
import Image from "../components/layout/image"
import SEO from "../components/layout/seo"
import { testButton } from "../actions"

const IndexPage = ({ test, testButton }) => {
  const [formValue, setFormValue] = useState({
    name: "",
  })

  const onChange = e => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    console.log(formValue)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <h4
        css={tw`font-semibold tracking-wider text-5xl text-pink-600 leading-snug truncate`}
      >
        This is Soumya
      </h4>
      <form className="form" onSubmit={onSubmit}>
        <Input name="name" value={formValue.name} onChange={onChange} />
        <Button primary loading>
          Submit
        </Button>
      </form>

      <h4 className="to-orange-500">Hello World</h4>
      <button
        css={tw`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        onClick={testButton}
      >
        {test && test.on ? "On" : "Off"}
      </button>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <div css={tw`flex flex-row bg-gray-200 justify-around`}>
        <Link to="/page-2/">
          <h5 css={tw`text-pink-600`}>Go to Page 2</h5>
        </Link>
        <Link to="/app/dashboard">
          <h5 css={tw`text-pink-600`}>Go to Dashboard</h5>
        </Link>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  test: state.test,
})

export default connect(mapStateToProps, { testButton })(IndexPage)
