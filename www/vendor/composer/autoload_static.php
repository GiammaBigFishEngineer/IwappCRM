<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit8ea88c32c8c46955a8665fdd183427e5
{
    public static $prefixLengthsPsr4 = array (
        'C' => 
        array (
            'CodeInc\\StripAccents\\' => 21,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'CodeInc\\StripAccents\\' => 
        array (
            0 => __DIR__ . '/..' . '/codeinc/strip-accents/src',
        ),
    );

    public static $prefixesPsr0 = array (
        'P' => 
        array (
            'PHPExcel' => 
            array (
                0 => __DIR__ . '/..' . '/phpoffice/phpexcel/Classes',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit8ea88c32c8c46955a8665fdd183427e5::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit8ea88c32c8c46955a8665fdd183427e5::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit8ea88c32c8c46955a8665fdd183427e5::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit8ea88c32c8c46955a8665fdd183427e5::$classMap;

        }, null, ClassLoader::class);
    }
}