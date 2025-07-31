import Section1 from "./(sections)/section1";
import Section2 from "./(sections)/section2";
import Section3 from "./(sections)/section3";
import Section4 from "./(sections)/section4";

export default function ShowCase() {
  return (
    <div className="w-screen h-screen bg-muted-foreground">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}
