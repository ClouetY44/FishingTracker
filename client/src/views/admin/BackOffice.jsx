import DeleteUser from "./form/DeleteUser";
import UpdateRole from "./form/UpdateRole";
import DeleteLake from "./form/DeleteLake";
import DeleteFish from "./form/DeleteFish";
import Infos from "./Infos";

function BackOffice() {

  return (
    <main>
      <section className="adminPanel">
        <h3>Panneau Administrateur</h3>
        <article>
          <Infos/>
        </article>
        <DeleteUser/>
        <UpdateRole/>
        <DeleteLake/>
        <DeleteFish/>
      </section>
    </main>
  );
}

export default BackOffice;
