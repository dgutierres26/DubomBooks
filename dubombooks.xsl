<?xml version="1.0" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:template match="/">
        <table id="bookTable" border="1" class="indent">
            <thead>
                <tr>
                    <th colpan="5">DubomBooks</th>
                    <th>
                        <input type="checkbox" id="bestseller" name="bestseller" value="book"/>
                        <label for="bestseller"> Bestseller</label>
                    </th>
                </tr>
                <tr>
                    <th>Select</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Price</th>
                </tr>    
            </thead>
            <tbody>
                <xsl:for-each select="/books/section">
                    <tr>
                        <td colspan="5">
                            <xsl:value-of select="@name" />
                        </td>
                    </tr>
                    <xsl:for-each select="book">
                        <tr id="{position()}">
                            <xsl:attribute name="bestseller" >
                                <xsl:value-of select="boolean(@bestseller)" />
                            </xsl:attribute>
                            <td align="center">
                                <input name="title0" type="checkbox" />
                            </td>
                            <td align="left"> 
                                <xsl:value-of select="title" />
                            </td>
                            <td align="left">
                                <xsl:value-of select="author" />
                            </td>
                            <td align="left">
                                <xsl:value-of select="publisher" />
                            </td>
                            <td align="center">
                                <xsl:value-of select="price" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </xsl:for-each>
            </tbody>
        </table>
   </xsl:template>
</xsl:stylesheet>