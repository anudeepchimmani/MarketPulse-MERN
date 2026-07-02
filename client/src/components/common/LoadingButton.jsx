function LoadingButton({
  loading,
  text,
  loadingText,
  className = "btn btn-success w-100",
  type = "submit",
}) {
  return (
    <button
      type={type}
      className={className}
      disabled={loading}
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
          ></span>

          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
}

export default LoadingButton;