namespace PlannerApp.Models.Generic
{
    public static class Role
    {
        public const string Admin = "Admin";

        #region Development
        public const string JuniorDeveloper = "JuniorDeveloper";
        public const string SeniorDeveloper = "SeniorDeveloper";
        public const string TechLead = "TechLead";
        public const string TeamLead = "TeamLead";
        #endregion

        #region Management
        public const string ProjectManager = "ProjectManager";
        #endregion

        #region TechSupport
        public const string SystemAdministrator = "SystemAdministrator";
        public const string HardwareSupport = "HardwareSupport";
        #endregion

        #region Auxilliary
        public const string MedicalStaff = "MedicalStaff ";
        #endregion

        public const string AllRoles = "Admin,JuniorDeveloper,SeniorDeveloper,TechLead,TeamLead,ProjectManager,SystemAdministrator,HardwareSupport,MedicalStaff";

    }
}
