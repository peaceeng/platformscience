export const DescriptionText = () => {
  return (
    <p style={{ textAlign: "left" }}>
      The top-secret algorithm is: <br />
      1) If the length of the shipment's destination street name is even, the
      base suitability score (SS) is the number of vowels in the driver’s name
      multiplied by 1.5. <br />
      2) If the length of the shipment's destination street name is odd, the
      base SS is the number of consonants in the driver’s name multiplied by 1.{" "}
      <br />
      3) If the length of the shipment's destination street name shares any
      common factors (besides 1) with the length of the driver’s name, the SS is
      increased by 50% above the base SS. <br />
      4) For example, if provided a driver file with Daniel Davidson on one line
      and an address file with 44 Fake Dr., San Diego, CA 92122 on a line, that
      pairing’s suitability score would be 9 .
    </p>
  );
};
