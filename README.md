# PimCore-Custom-Interpreter
Importing CSV data into relevant data-Objects.
Question - 

I have use “Import Definition” bundle to import csv and to create data-objects. (https://github.com/w-vision/ImportDefinitions)

Now I need to put imported data-Object to relevant folders. I need to do it automatically.

eg -

Import first row of the CSV
Check the CSV first row "Category" column value
According to column value need to move into relevant folder.
Setting object path "/products/%Text(mycolumn1);/%Text(mycolumn2);" is not solution to my requirement.

My csv it’s comes with category code not full name. I need to do some mapping.

eg:- csv column category value is - OFH my data-object folder name is Office & Furniture Hardware

I need to match those two and place into correct folder.

What is the best way to do this with “Import Definitions”?

if best way is "interpreter" please let me know how to do it?


Answer - 

Fist install Import Definition -

https://github.com/w-vision/ImportDefinitions

(it'll install into - /var/www/html/example2.loc/vendor/w-vision/import-definitions/src/ImportDefinitionsBundle/)

composer require w-vision/import-definitions:^2.0-dev

bin/console pimcore:bundle:enable ImportDefinitionsBundle

bin/console pimcore:bundle:install ImportDefinitionsBundle
Add new custom Interpreter

Add "categorymap.js" to /var/www/html/example2.loc/vendor/w-vision/import-definitions/src/ImportDefinitionsBundle/Resources/public/pimcore/js/interpreters/categorymap.js

Add "CategoryMap.php" to /var/www/html/example2.loc/vendor/w-vision/import-definitions/src/ImportDefinitionsBundle/Interpreter/CategoryMap.php

Add "CategoryMapInterpreterType.php" to /var/www/html/example2.loc/vendor/w-vision/import-definitions/src/ImportDefinitionsBundle/Form/Type/Interpreter/CategoryMapInterpreterType.php

Update Service.yml in - /var/www/html/example2.loc/vendor/w-vision/import-definitions/src/ImportDefinitionsBundle/Resources/config/services.yml

adding Following -

import_definition.interpreter.category_map: class: ImportDefinitionsBundle\Interpreter\CategoryMap tags: - { name: import_definition.interpreter, type: category_map, form-type: ImportDefinitionsBundle\Form\Type\Interpreter\CategoryMapInterpreterType }

Update config.yml in -

adding follwing -

interpreter_categorymap: '/bundles/importdefinitions/pimcore/js/interpreters/categorymap.js'
To csv upload run following CLI command -

bin/console import-definitions:import -d 1 -p "{\"file\":\"sap_export1.csv\"}" 


