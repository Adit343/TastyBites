import React from "react";

const About = () => {
  return (
    <div className="about-container bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8">About Tasty Bites</h1>
        <p className="text-lg mb-4">
          Welcome to Tasty Bites, your number one source for all things food. We're dedicated to giving you the very best of food delivery, with a focus on quality, customer service, and uniqueness.
        </p>
        <p className="text-lg mb-4">
          Founded in 2024, Tasty Bites has come a long way from its beginnings in a small kitchen. When we first started out, our passion for delicious food and eco-friendly cooking drove us to quit our day jobs, do tons of research, and gave us the impetus to turn hard work and inspiration into a booming online food delivery service. We now serve customers all over the city and are thrilled to be a part of the fair trade wing of the food delivery industry.
        </p>
        <p className="text-lg mb-4">
          We hope you enjoy our service as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
        </p>
        <p className="text-lg font-bold">
          Sincerely,<br />
          Tasty Bites Team
        </p>
      </div>
    </div>
  );
};

export default About;
