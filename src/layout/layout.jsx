import Menu from "../components/menu";

const LayoutPrincipal = (props) => {

  return (
    <div className="layoutPrincipal" style={{ display: 'flex' }}>
      <div>
        <Menu />
      </div>
      <div className="layoutPrincipal__content" style={{ width:'100%', display:'flex', marginLeft:'1%'}}>{props.children}</div>
    </div>
  );
};

export default LayoutPrincipal;
