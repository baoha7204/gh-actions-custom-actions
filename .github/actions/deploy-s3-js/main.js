const core = import("@actions/core");
const exec = import("@actions/exec");

function run() {
  // Get inputs
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const dist = core.getInput("dist-folder", { required: true });

  // Upload files
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${dist} ${s3Uri} --region ${bucketRegion}`);

  // Set outputs
  core.setOutput(
    "website-url",
    `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`
  );
}

run();
