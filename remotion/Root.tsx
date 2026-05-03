import {Composition} from "remotion";
import {NriConsultingIntro} from "./scenes/nri-consulting-intro";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="NriConsultingIntro"
        component={NriConsultingIntro}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          companyName: "株式会社野村総合コンサルティング",
        }}
      />
    </>
  );
};
