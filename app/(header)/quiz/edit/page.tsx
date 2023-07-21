const Edit = ({ params }: { params: { slug: number } }): React.ReactNode => {
  return (
    <div>
      <h3>{params.slug}</h3>
    </div>
  );
};

export default Edit;
