import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import { shallow } from 'enzyme';
import { Blog } from "./Blog";
import { posts } from "../../../test/mock-data";

describe("Blog", function() {
  let component;

  it("exist and renders html", () => {
    const wrapper = shallow(<Blog />);
    expect(wrapper.html()).toBeTruthy();
  });

  it("renders correct number of child BlogPost components", () => {
    const wrapper = shallow(<Blog posts={posts} />);
    expect(wrapper.find('BlogPost').length).toBe(3);
  });

  it("set correct params to the child BlogPost components", () => {
    const wrapper = shallow(<Blog posts={posts} />);
    wrapper.find('BlogPost').forEach((blogPost, i) => {
      expect(blogPost.props().post).toBe(posts[i]);
    });
  });

});
