import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import { shallow } from 'enzyme';
import { BlogPost } from "./BlogPost";
import { posts } from "../../../../test/mock-data";
import moment from 'moment';

const post = posts[0];

describe("Blog Post", function() {
  let component;

  it("exist and renders html if post param passed", () => {
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.html()).toBeTruthy();
  });

  it("renders post author", () => {
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.text().indexOf(post.author)).not.toBe(-1);
  });

  it("renders post date in a proper format", () => {
    const wrapper = shallow(<BlogPost post={post} />);
    const date = moment(post.publish_date).format("MMMM D, YYYY");
    expect(wrapper.text().indexOf(date)).not.toBe(-1);
  });

  it("renders link to a post", () => {
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it("link to a post has correct url", () => {
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.find('Link').props().to.pathname).toBe(`/blog/${post.slug}`);
  });

  it("link to a post contains data of the post", () => {
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.find('Link').props().to.state.post).toBe(post);
  });

  it("renders post description", () => {
    const wrapper = shallow(<BlogPost post={post} />);
    expect(wrapper.text().indexOf(post.description)).not.toBe(-1);
  });

});
