import * as shell from "shelljs";

// Copy all the view templates
shell.cp( "-R", "app/views", "dist/app/views" );
