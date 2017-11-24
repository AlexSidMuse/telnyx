import React from "react";
import ReactTestUtils from "react-addons-test-utils";
import fetchMock from 'fetch-mock';
import { shallow } from 'enzyme';
import { BlogContainer } from "./Blog.container";
import { API_URL } from "../gateway/config";
import { getAllPosts } from "../gateway/posts";
import { posts } from "../../../test/mock-data";

fetchMock.get(`${API_URL}/posts/`, posts);

describe("Blog Container", function() {

  it("exist and renders html", () => {
    const wrapper = shallow(<BlogContainer />);
    expect(wrapper.html()).toBeTruthy();
  });

  it("fetches blog posts from the server", (done) => {
    const wrapper = shallow(<BlogContainer />);
    wrapper.instance().postsLoader.then(() => {
      expect(wrapper.state().posts.length).toBe(3);
      done();
    });
  });

  it("sorts posts in correct order - newest first", (done) => {
    const wrapper = shallow(<BlogContainer />);
    wrapper.instance().postsLoader.then(() => {
      const posts = wrapper.state().posts;
      const firstPostDateTS = new Date(posts[0].publish_date).getTime();
      const secondPostDateTS = new Date(posts[1].publish_date).getTime();
      const thirdPostDateTS = new Date(posts[2].publish_date).getTime();
      expect(firstPostDateTS > secondPostDateTS).toBe(true);
      expect(secondPostDateTS > thirdPostDateTS).toBe(true);
      done();
    });
  });

});
